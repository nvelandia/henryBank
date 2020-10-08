const {User} = require('../../db');
const axios = require('axios');
const { MoleculerError } = require("moleculer").Errors;

module.exports = async (ctx) => {

    const {doc_type,doc_number,name,surname,birthdate,phone_number,address_street,address_number,locality,province,country} = ctx.params
    const {id} = ctx.meta.user
    
    let usuario = await User.findOne({where:{id}})
    
    //Verificación de usuario eliminado
    if(usuario == null){
        throw new MoleculerError("User doesn't exists",410,"USER_NOTFOUND",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }

    //Verificación de EDAD
    const getEdad = (dateString) =>{
        //Tomo la fecha en que se realiza la petición
        let today = new Date()
        //Tomo la fecha de cumpleaños
        let birthdate = new Date(dateString)
        //Tomo la diferencia de años y meses
        let yearsOld = today.getFullYear() - birthdate.getFullYear()
        let months = today.getMonth - birthdate.getMonth()
        //Si la diferencia de meses es menor a 0, o la diferencia de meses es 0 y el día de cumpleaños es mayor(es después de hoy), entonces le resto un año a la edad
        if(months < 0 || (months === 0 && today.getDate < birthdate.getDate())){
            yearsOld--
        }
        //Retorno edad
        return yearsOld
    }

    //Verifico que la edad que retorna esa función sea mayor a 16
    if(getEdad(birthdate) < 16){
        throw new MoleculerError("You have to be over 16 years old",422,"UNDERAGE",{ nodeID: ctx.nodeID, action:ctx.action.name })
    }


    //No hice verificación de nombre y apellido porque puede existir cualquier cosa
    //No hice verificación del correo porque en teoría se verificó en el registro

    //Verificaciones de DNI y número telefónico
    if(doc_type !== "dni" && doc_type !== "passport"){
        throw new MoleculerError("Invalid document type",422,"DOCUMENTTYPE_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }

    if(`${doc_number}`.length>10){
        throw new MoleculerError("Invalid document number",422,"DOCUMENT_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }

    if(`${phone_number}`.length<10 || `${phone_number}`.length>20){
        throw new MoleculerError("Invalid phone number",422,"PHONENUMBER_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });
    }



    //Normalización de la dirección del usuario.
    
    if(address_street.length<1){
        throw new MoleculerError("Invalid address format",422,"STREET_WRONG", { nodeID: ctx.nodeID, action:ctx.action.name });

    }


    const data = await axios.get(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${address_street} ${address_number}&provincia=${province}&localidad=${locality}`)
    .then(async response =>{
        const information = response.data

        if(information.cantidad==0){
            throw new MoleculerError("Invalid address",422,"CONFIRMATION_FAILED", { nodeID: ctx.nodeID, action:ctx.action.name });
        }

        if(information.cantidad !== 0){
            User.update({
                doc_type,
                doc_number,
                name,
                surname,
                birthdate,
                phone_number,
                address_street:information.direcciones[0].calle.nombre,
                address_number:information.direcciones[0].altura.valor,
                locality:information.direcciones[0].localidad_censal.nombre,
                province:information.direcciones[0].provincia.nombre,
                country,
                dataCompletedAt: Date.now()
            },{where:{id}})
            .then(()=>{
                
            })

            return {status: 200, message: 'Register confirmation success'};
        }
    })
    
    return {data:{
        user:{
            id: usuario.id,
            name: usuario.name,
            surname: usuario.surname,
            email: usuario.email,
            avatar: usuario.avatar,
            emailVerifiedAt:usuario.emailVerifiedAt,
            dataCompletedAt:usuario.dataCompletedAt
        }
    }}
    

}
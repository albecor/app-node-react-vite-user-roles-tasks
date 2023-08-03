import Role from '../models/role.model.js'

export const createRoles = async () => {    
    try {
        const count = await Role.estimatedDocumentCount() 

        if (count > 0) return;
      
        ///Aquí puedo agregar o dejar los tipos de usuario que necesito.
        const values = await Promise.all([
            new Role({name: 'staff'}).save(),
            new Role({name: 'lab'}).save(),
            new Role({name: 'patient'}).save(),
            new Role({name: 'user'}).save(),
            new Role({name: 'moderator'}).save(),
            new Role({name: 'admin'}).save(),
            new Role({name: 'root'}).save()
        ])

        console.log('Estos son los roles a usar en la app')
        console.log(values)

    } catch (error) {
        console.error(error)
    } 
      
}
export const editEmail = (email)=>{
    return{
        type:'editEmail',
        payload:{
            email: email
        }
    };
}
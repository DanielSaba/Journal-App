export const fileUpload = async (file)=>{

    const cloud='https://api.cloudinary.com/v1_1/dasabasaba/image/upload';
    const formdata=new FormData();
    formdata.append('upload_preset','react-journal');
    formdata.append('file',file);
    
    try{
        const resp=await fetch(cloud,{
            method:'POST',
            body:formdata
        });
        if(resp.ok){
            const cloudResp=await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }

    } catch(err){
        throw err;
    }

}
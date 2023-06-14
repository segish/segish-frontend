import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({setOpenUpdate,user}) => {

    const [cover,setCover]=useState(null)
    const [profile,setProfile]=useState(null)
    const [texts,setTexts] = useState({
        name:user.name,
        city:user.city,
        website:user.website,
    })

    const upload = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
          
        } catch (err) {
          console.log(err);
        }
      };

      const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };

      const queryClient = useQueryClient();

      const mutation = useMutation(
        (userdata) => {
          return makeRequest.put("/users/update", userdata);
        },
        {
          onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["user"]);
            queryClient.invalidateQueries(["profile"]);
          },
        }
      );

    
      const handleSubmit = async (e) => {
        e.preventDefault();
        let coverURL;
        let profileURL;
        
        coverURL = cover ? await upload(cover): user.coverpic;
        profileURL = profile ? await upload(profile): user.profilePic;

        mutation.mutate({ ...texts, coverPic:coverURL, profilePic:profileURL });
        setOpenUpdate(false);
      };
    

  return (
    <div className="update">
    <button onClick={()=>setOpenUpdate(false)}>X</button>
        <form>
            <label htmlFor="input">your cover picture  :  
            <input type="file" onChange={e=>setCover(e.target.files[0])}/></label>
            <label htmlFor="input">Your profile picture  :  
            <input type="file" onChange={e=>setProfile(e.target.files[0])}/></label>
            <input type="text" placeholder="your name" name="name" onChange={handleChange}/>
            <input type="text" placeholder="your city" name="city" onChange={handleChange}/>
            <input type="text" placeholder="your website" name="website" onChange={handleChange}/>
            <button onClick={handleSubmit}>update</button>
        </form>
    </div>
  )
}

export default Update

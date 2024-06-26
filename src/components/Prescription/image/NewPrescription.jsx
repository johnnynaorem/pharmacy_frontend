import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import deliver from "../image/deliver.svg";
import img from "../image/prescription_image.svg";
import refil from "../image/refil.svg";
import "./New.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

const NewPrescription = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState()
  const [auth] = useAuth()

  const handleUpload = async (e) => {
    e.preventDefault();
    const prespcription = new FormData()
    prespcription.append("image", image)
    try {
      const {data} = await axios.post(`https://pharmacy-backend-pi.vercel.app/api/v1/auth/uploadPrescription/${auth.user.id}`, prespcription)
      if(data.success){
        toast.success(data.message);
        navigate(`/product/${slug}`)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let slug = localStorage.getItem('currentItem');
    if(slug){
      slug = JSON.parse(slug)
      setSlug(slug)
    }
  }, [])

  console.log(auth)
  
  return (
    <Layout>
      <div className="container-xl mx-auto" style={{ marginBottom: "80px" }}>
        <div className="row row-cols-sm-2 row-cols-lg-2 g-3 p-4">
          <div className="col">
            <div className="p-4 bg-white shadow">
              <h1 className="text-part">Deliver Across Manipur</h1>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <button className="button btn btn-primary rounded-3xl">
                    Order Now
                  </button>
                </div>
                <img src={deliver} alt className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-4 bg-white shadow">
              <h1 className="text-part">Refill Medicine</h1>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <button className="button btn btn-primary rounded-3xl">
                    Reorder Now
                  </button>
                </div>
                <img src={refil} alt className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="row p-4"
          style={{
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="col d-flex flex-column justify-content-between">
            <h1 className="xl-text-6xl lg-text-5xl sm-text-2xl text-3xl font-extrabold">
              Have Prescriptions?
            </h1>
            <h1 className="text-xl lg-text-3xl">
              Upload &gt; Verify &gt; Order
            </h1>
            <button className="btn btn-primary rounded-3xl w-150px">
              Upload Now
            </button>
          </div>
          <img
            src={img}
            alt
            className="img-fluid xl-w-350px lg-w-300px sm-flex-1 w-200px"
          />
        </div> */}
        <div
          className="d-flex p-3 justify-content-evenly"
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="d-flex flex-column gap-5 sm-flex-1">
            <h1 className="text-part">Have Prescriptions?</h1>
            <h1 className="text-part">Upload &gt; Verify &gt; Order</h1>
            <button className="btn btn-primary rounded-3xl" onClick={ handleUpload }>Upload Now</button>
          </div>
          {/* <img src={img} alt width={"200px"} />
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          /> */}
          <div className="formInput">
            <label htmlFor="image" style={{cursor: 'pointer'}}>
              {image? <img src={URL.createObjectURL(image)} alt width={"200px"} />:<img src={img} alt width={"200px"} />}
            </label>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewPrescription;

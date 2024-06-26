import deliver from '../image/deliver.svg'
import img from '../image/prescription_image.svg'
import refil from '../image/refil.svg'

function Prescription() {
  return (
    <div className='w-[100%] h-[100vh]' style={{width:'100%', height: '100vh'}}>
      <div className='max-w-[1200px] mx-auto grid sm:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-3 p-[20px] '>
        <div className='flex flex-row sm:flex-col gap-8'>
          <div className='p-[20px] bg-[#FFFFFF] drop-shadow-xl flex-1'>
            <h1 className='text-xl font-bold'>Deliver Across Manipur</h1>
            <div className="flex justify-between">
              <div className='mt-4'>
                <button className='border-solid border-2 bg-[#E8505B] sm:p-[5px_20px] p-[5px_30px] rounded-3xl text-white sm:text-[10px] lg:text-[14px] text-[8px]'>Order Now</button>
              </div>
              <img src={deliver} alt="" className='sm:w-[100px] lg:w-[150px] w-[80px]'/>
            </div>
          </div>
          <div className='p-[20px] bg-[#FFFFFF] drop-shadow-xl flex-1'>
            <h1 className='text-xl font-bold'>Refill Medicine</h1>
            <div className="flex justify-between">
              <div className='mt-4'>
                <button className='border-solid border-2 bg-[#E8505B] sm:p-[5px_20px] p-[5px_30px] rounded-3xl text-white sm:text-[10px] lg:text-[14px] text-[8px]'>Reorder Now</button>
              </div>
              <img src={refil} alt="" className='sm:w-[100px] lg:w-[150px] w-[80px]'/>
            </div>
          </div>
        </div>
        <div className='w-[100%] flex p-4 ' style={{boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)"}}>
          <div className='flex flex-col gap-6 justify-evenly'>
            <h1 className='xl:text-6xl lg:text-5xl sm:text-2xl text-3xl font-extrabold '>Have Prescriptions?</h1>
            <h1 className='text-xl lg:text-3xl'>Upload &gt; Verify &gt; Order</h1>
            <button className='w-[150px] bg-[#E8505B] p-[5px_20px] rounded-3xl text-white sm:text-[14px] text-[10px]'>Upload Now</button>
          </div>
          <img src={img} alt="" className='xl:w-[350px] lg:w-[300px] sm:flex-1 w-[200px]'/>
        </div>
      </div>  
    </div>
  )
}

export default Prescription

import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const AddCar = () => {

const [image,setImage] = useState('')
const currency = import.meta.env.VITE_CURRENCY
const [car,setCar ] = useState({
  brand: '',
  model: '',
  year: 0,
  pricePerDay: 0,
  category: '',
  transmission: '',
  fuel_type: '',
  seating_capacity: 0,
  location: '',
  description: '',
})
const onSubmitHandler = async (e)=>{
  e.preventDefault()
}

  return (
    <div>
       <div >
        <h2 >Admin Dashboard Overview & Analytics</h2>
        <p >Your centralized hub for monitoring cars, customer bookings, real-time revenue streams, and recent activity in one place.</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor='car-image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt='' />
            <input type='file' id='car-image' accept='image/*' hidden onChange={(e)=>setImage(e.target.files[0])}/>
          </label>
          <p>Upload a picture of your car</p>
        </div>

        <div>
          <div>
            <label>Brand</label>
            <input type='text' placeholder='e.g Nissan, Toyota,Audi...' required value={car.brand} 
            onChange={(e)=>setCar({...car, brand:e.target.value})}/>
          </div>

          <div>
            <label>Model</label>
            <input type='text' placeholder='e.g X5, E-class, M4...' required value={car.model} 
            onChange={(e)=>setCar({...car, model:e.target.value})}/>
          </div>
        </div>

        <div>
           <div>
            <label>Year</label>
            <input type='number' placeholder='2025' required value={car.year} 
            onChange={(e)=>setCar({...car, year:e.target.value})}/>
          </div>

          <div>
            <label>Daily Price({currency})</label>
            <input type='number' placeholder='1000' required value={car.pricePerDay} 
            onChange={(e)=>setCar({...car, pricePerDay:e.target.value})}/>
          </div>
           <div>
            <label>Category</label>
            <select onChange={(e)=>setCar({...car, category: e.target.value})} value={car.category}>
              <option value=''>Select a Category</option>
              <option value='Sedan'>Sedan</option>
              <option value='SUV'>SUV</option>
              <option value='Van'>Van</option>
            </select>
          </div>
        </div>

        <div>
           <div>
            <label>Transmission</label>
            <select onChange={(e)=>setCar({...car, transmission: e.target.value})} value={car.transmission}>
              <option value=''>Select a Transmission</option>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
              <option value='Semi-Automatic'>Semi-Automatic</option>
            </select>
          </div>
          <div>
            <label>Fuel Type</label>
            <select onChange={(e)=>setCar({...car, fuel_type: e.target.value})} value={car.fuel_type}>
              <option value=''>Select a Fuel Type</option>
              <option value='Gas'>Gas</option>
              <option value='Diesel'>Diesel</option>
              <option value='Petrol'>Petrol</option>
              <option value='Electric'>Electric</option>
              <option value='Hybrid'>Hybrid</option>
            </select>
          </div>
          <div>
            <label>Seating Capacity</label>
            <input type='number' placeholder='4' required value={car.seating_capacity} 
            onChange={(e)=>setCar({...car, seating_capacity:e.target.value})}/>
          </div>
        </div>
           <div>
             <label>Location</label>
            <select onChange={(e)=>setCar({...car, location: e.target.value})} value={car.location}>
              <option value=''>Select a Location</option>
              <option value='Tezpur'>Tezpur</option>
              <option value='Jorhat'>Jorhat</option>
              <option value='Guwahahti'>Guwahahti</option>
              <option value='Dibrugarh'>Dibrugarh</option>
              <option value='Nogaon'>Nogaon</option>
              <option value='Dhubri'>Dhubri</option>
              <option value='Tinsukiya'>Tinsukiya</option>
              <option value='Morigoan'>Morigoan</option>
              <option value='Dhemaji'>Dhemaji</option>
              <option value='Sivsagar'>Sivsagar</option>
              <option value='BiswaNath'>BiswaNath</option>
            </select>
           </div>
              <div>
            <label>Description</label>
            <textarea rows={6} placeholder='e.g A luxuorious SUV with a spacing interior and powerful engine' required value={car.description} 
            onChange={(e)=>setCar({...car, description:e.target.value})}></textarea>
          </div>
          <button>
            <img src={assets.tick_icon} alt='' />
            List Your Car
          </button>
      </form>
    </div>
  )
}

export default AddCar

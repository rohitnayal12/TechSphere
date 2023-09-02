// import React, { useState } from "react";
// import "../index.css";
// import { useNavigate } from "react-router-dom";
// // import { CourseDiv } from "./CourseDiv";

// export const Home = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [showToast, setShowToast] = useState(false);

//   const handleGetStartedClick = () => {
//     if (email.trim() === "" || name.trim() === "") {
//       setShowToast(true);
//     } else {
//       // Save name and email in local storage
//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       navigate("/coursediv");
//     }
//   };

//   return (
//     <div className="bg-blue-100 mt-9 flex items-center justify-center ">
//       <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)">
//         <h1 className="text-3xl font-semibold mb-4">
//           Join Our Interview Warm-up Program
//         </h1>
//         <p className="text-gray-700 mb-6">
//           Prepare for your upcoming interviews with our comprehensive warm-up
//           program.
//         </p>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             type="email"
//             id="email"
//             placeholder="example@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
//             Name
//           </label>
//           <input
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             type="text"
//             id="name"
//             placeholder="John Doe"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <button
//           className="bg-blue-500 text-red py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 border border-blue-500 btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded"
//           onClick={handleGetStartedClick}
//         >
//           Get Started
//         </button>
//         {showToast && (
//           <div className="text-red-500 mt-2">
//             Please fill all boxes before clicking Get Started.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import Select from "react-select";
// import CourseDetails from "./CourseDetails";
// import CourseProvider from "../Contexts/CourseContext";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";

const options = [
  {
    value: "",
    label: "Select",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPJxv37UESSyMb4OlkeToPbh4gRUh01RQ95QEzbhBI2BumXCpAK5rY-0Ya4qgTPaYNy0&usqp=CAU",
  },
  {
    value: "MERN",
    label: "MERN",
    image:
      "https://w7.pngwing.com/pngs/235/872/png-transparent-react-computer-icons-redux-javascript-others-logo-symmetry-nodejs-thumbnail.png",
  },
  {
    value: "JAVA",
    label: "JAVA",
    image: "https://img.icons8.com/color/480w/java-coffee-cup-logo--v1.png",
  },
  {
    value: "NODE",
    label: "NODE",
    image:
      "https://w7.pngwing.com/pngs/780/57/png-transparent-node-js-javascript-database-mongodb-native-miscellaneous-text-trademark.png",
  },
  {
    value: "OTHER INFO",
    label: "OTHER INFO",
    image:
      "https://cdn4.vectorstock.com/i/1000x1000/52/73/machine-learning-logo-design-brain-ai-technology-vector-28535273.jpg",
  },
];

const CustomOption = ({ innerProps, label, data }) => (
  <div {...innerProps} className="flex items-center h-14 px-4">
    <img src={data.image} alt={data.label} className="w-10 h-10 mr-4" />
    {data.label}
  </div>
);

const CustomSingleValue = ({ innerProps, label, data }) => (
  <div {...innerProps} className="flex items-center h-8">
    <img src={data.image} alt={data.label} className="w-8 h-8 mr-4" />
    {data.label}
  </div>
);

export const Home=()=> {
  const nav = useNavigate();
  const [course, setCourse] = useState("");
  const [showCheckboxes, setShowCheckboxes] = useState(false); // State to manage the visibility of checkboxes
  const [category, setCategory] = useState([]);
  const [Text, setText] = useState("");

  const handleCheckBox = (e) => {
    let { value } = e.target;
    let newCategory = [...category];
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((el) => el !== value);
    } else {
      newCategory.push(value);
    }
    setCategory(newCategory);
  };
  console.log(category);

  const handleChange = (selectedOption) => {
    setCourse(selectedOption.value);
    setShowCheckboxes(!!selectedOption.value); // Show checkboxes if the course has a value
  };
  const handleLocalStorageSaving = ()=>{
    let obj = {category};
    localStorage.setItem("category",JSON.stringify(obj));
    localStorage.setItem("other",Text);
    nav("/interview");
  }
  
  
  return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Select Your Course</h1>
        
        <Select
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "40px",
              width: "100%",
              padding: "5px",
            }),
          }}
          options={options}
          value={options.find((option) => option.value === course)}
          onChange={handleChange}
          components={{
            Option: CustomOption,
            SingleValue: CustomSingleValue,
          }}
        />
        
        {course && showCheckboxes && (
          <div className="w-full max-w-md space-y-2">
            <h2 className="text-lg font-bold text-black">Choose your options:</h2>
            <div className="space-y-2">
              {course === "MERN" && (
                <>
                  <Checkbox label="React" value="React" onChange={handleCheckBox} checked={category.includes("React")} />
                  <Checkbox label="Redux" value="Redux" onChange={handleCheckBox} checked={category.includes("Redux")} />
                  <Checkbox label="Hooks" value="React Hooks" onChange={handleCheckBox} checked={category.includes("React Hooks")} />
                </>
              )}
              {course === "JAVA" && (
                <>
                  <Checkbox label="JAVA" value="JAVA" onChange={handleCheckBox} checked={category.includes("JAVA")} />
                  <Checkbox label="MySQL" value="MySQL" onChange={handleCheckBox} checked={category.includes("MySQL")} />
                  <Checkbox label="SpringBoot" value="SpringBoot" onChange={handleCheckBox} checked={category.includes("SpringBoot")} />
                  <Checkbox label="JAVABasics" value="JAVABasics" onChange={handleCheckBox} checked={category.includes("JAVABasics")} />
                </>
              )}
              {course === "NODE" && (
                <>
                  <Checkbox label="Node Basic" value="NodeBasic" onChange={handleCheckBox} checked={category.includes("NodeBasic")} />
                  <Checkbox label="Express" value="Express.js" onChange={handleCheckBox} checked={category.includes("Express.js")} />
                  <Checkbox label="MongoDB" value="MongoDB" onChange={handleCheckBox} checked={category.includes("MongoDB")} />
                  <Checkbox label="HTTP" value="HTTP" onChange={handleCheckBox} checked={category.includes("HTTP")} />
                </>
              )}
              {course === "OTHER INFO" && (
                <>
                  <input
                    className="p-3 w-full"
                    placeholder="Write Your Topic here"
                    onChange={(e)=>setText(e.target.value)}
                  />
                </>
              )}
            </div>
          </div>
        )}
        
        <h4 className="text-xl font-bold text-black mt-4">
          Selected Track:
          <span className="text-xl font-bold text-yellow-600">&nbsp;{course}</span>
        </h4>
        <div className="w-full max-w-md mt-6">
          <button
            className="w-full py-3 text-lg font-bold text-white bg-purple-300 rounded-lg shadow-lg hover:bg-purple-600 transition-colors duration-300"
            onClick={handleLocalStorageSaving}
          >
            Start Interview
          </button>
 
        </div>
      </div>
    </div>
    // {/* </CourseProvider> */}
  );
}

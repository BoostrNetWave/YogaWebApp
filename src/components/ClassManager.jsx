import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { addYogaContent, modifyYogaContent, removeYogaContent } from "../REDUX_COMPONENTS/FEATURES/yogaContent.mjs"
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

function Modal({ onclose, onSave, classData }) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    }
  }, [classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0].name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <main className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
        <div className="flex justify-end">
          <button
            onClick={onclose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">Recordings</label>
            <input
              type="file"
              name="recording"
              onChange={handleFileChange}
              className="block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-[#779393] file:border-0 file:mr-4 file:py-2 file:px-4"
            />
          </div>

          <div>
            <label className="font-medium">Image</label>
            <input
              type="file"
              name="img"
              onChange={handleFileChange}
              className="block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-[#779393] file:border-0 file:mr-4 file:py-2 file:px-4"
            />
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div>

          <button className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300">
            {classData ? "Edit" : "Add"}
          </button>
        </form>
      </main>
    </div>
  );
}

const ClassManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [editClassData, setEditClassData] = useState(null);
  const { data: classes } = useSelector((state) => state.yogacontent);
  const dispatch = useDispatch();

  const handleAddClass = (newClass) => {
    dispatch(addYogaContent(newClass));
    setShowModal(false);
  };

  const handleEditClass = (editedClass) => {
console.log(editClassData)
    axios.put(`admin/modifyContent/${editedClass._id}`, {
      contentLink: editedClass.contentLink,
      indexImage: editedClass.indexImage,
      description: editedClass.description
    })
      .then(res => {
        res.data === true
          ? dispatch(modifyYogaContent(editedClass))
          : toast("Something went wrong!!!")
      })
      .catch(err => {
        console.error(`Error while updating the content details --> ${err}`)
        toast("Network connection error!!!")
      })
    setEditClassData(null);
  };

  const handleDeleteClass = (id) => {
    dispatch(deleteClass(id));
  };

  const handleEditButtonClick = (yogaClass) => {
    setEditClassData(yogaClass);
    setShowModal(true);
  };

  const displayedClasses = classes.slice();

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Popular Classes
        </h1>
        <p className="mt-3 text-gray-500">
          Mind and Body practice with origins in ancient Indian Philosophy
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9]"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {displayedClasses.map((item) => (
          < article
            key={item.id}
            className="max-w-md mx-auto mt-4 rounded-md duration-300 hover:shadow-lg"
          >
            <div className="flex justify-end">
              <FaEdit onClick={() => handleEditButtonClick(item)} />
              <MdDelete onClick={() => handleDeleteClass(item.id)} />
            </div>
            <Link to={`${item.contentHeading}`}>
              <img
                src={`/${item.indexImage}`}
                loading="lazy"
                alt={item.contentHeading}
                className="w-full h-48 rounded-t-md object-contain"
              />
              <div className="pt-3 ml-4 mr-2 mb-3 flex flex-col justify-center items-center">
                <h3 className="text-xl text-gray-900">{item.contentHeading}</h3>
                <p className="text-[#779393] font-semibold text-sm mt-1 text-center">
                  {item.description}
                </p>
              </div>
            </Link>
          </article>
        ))
        }
      </div >
      {
        showModal && (
          <Modal onclose={() => setShowModal(false)} onSave={handleAddClass} />
        )
      }
      {
        editClassData && (
          <Modal
            onclose={() => setEditClassData(null)}
            classData={editClassData}
            onSave={handleEditClass}
          />
        )
      }
      {/* <ClassManager /> */}
    </section >
  );
};

export default ClassManager;
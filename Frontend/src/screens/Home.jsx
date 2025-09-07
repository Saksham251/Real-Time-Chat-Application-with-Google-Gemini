import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/user.context'

import axios from "../config/axios.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [projects,setProjects] = useState([]);

  const navigate = useNavigate();
  
  useEffect(()=>{
    axios.get("/projects/all").then((res)=>{
      setProjects(res.data.projects);
    }
    ).catch((error)=>{console.log(error)});
  },[]);

  async function createProject(e) {
    e.preventDefault();
    // empty - error
    setError("");

    console.log({ projectName });
    try {
      const res = await axios.post("/projects/create", {
        name: projectName
      });
      console.log("Project created:", res.data);
      // success → close modal
      setIsModalOpen(false);
      setProjectName("");
    }
    catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "Project name must be unique"
      ) {
        setError("⚠️ Project name must be unique");
      } else {
        setError("Something went wrong. Try again.");
      }
    }

  }
  return (
    <main className='p-4'>
      <div className="projects flex flex-wrap gap-3">
        <button
          className="project border border-slate-300 p-4 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >New Project
          <i className="ri-links-line ml-2"></i>
        </button>

        {
          projects.map((project)=>
            <div 
              key={project._id}
              onClick={()=>{
                navigate("/project",{
                  state:{project}
                });
              }}
              className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 bg-white hover:bg-slate-500 hover:text-white transition-colors duration-200"
            >
              <h2 className='font-semibold'>
                {project.name}
              </h2>
              <div className="flex gap-2">
                <p><small> <i className="ri-user-line"></i> Collaborators</small> :</p>
                {project.users.length}
              </div>
            </div>
          )
        }

      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  )
}

export default Home

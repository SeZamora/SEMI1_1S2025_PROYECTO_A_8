import { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import PhotoCaptureModal from "../../ux/PhotoCapture";

const api = import.meta.env.VITE_API_URL;

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profileImage: ""
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [photoBase64, setPhotoBase64] = useState(null);

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const cameraRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoCapture = (base64) => {
    setPhotoBase64(base64);
    notifySuccess("Foto capturada exitosamente.");
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");
    console.log("Email", formData.email);
    console.log("Password", formData.password);
    console.log("photoBase64", photoBase64);
    /*
    setError("");
    setSuccessMessage("");
    try {
      

      const response = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          profile_picture: photoBase64, 
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Error en el registro");

      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => (window.location.href = "/login"), 500);
    } catch (error) {
      setError(error.message);
    }
      */
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Registrarse</h2>

        {error && <div className="bg-red-500 text-white p-2 rounded-lg mb-4">{error}</div>}
        {successMessage && <div className="bg-green-500 text-white p-2 rounded-lg mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: correo@ejemplo.com"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Imagen de Perfil</label>
            <button
              type="button"
              onClick={() => cameraRef.current.open()}
              className="text-center p-3 mt-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            > Tomar Foto</button>
            
          </div>


          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
      <PhotoCaptureModal
        ref={cameraRef}
        onCapture={handlePhotoCapture}
        onClose={() => toast.info("Verificación cancelada.")}
        />

      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
    </div>


  );
};

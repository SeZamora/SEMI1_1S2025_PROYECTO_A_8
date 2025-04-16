import { Card } from '../ui/components/Card';
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from "../auth/context/AuthContext";
import { AgregarContrasenas } from './components/Contrasenas/AgregarContrasenas';
import { VerContrasenas } from './components/Contrasenas/VerContrasenas';
import { EditarContrasena } from './components/Contrasenas/EditarContrasena';
import { ToastContainer, toast } from 'react-toastify';
import PhotoCaptureModal from '../ux/PhotoCapture'; 

const jsonContrasenas = [
    {
        id: 1,
        nombre: 'Banco',
        usuario: '1140922',
        contrasena: '123456'
    },
    {
        id: 2,
        nombre: 'Google',
        usuario: '1140922',
        contrasena: '123456'
    },
    {
        id: 3,
        nombre: 'Facebook',
        usuario: '1140922',
        contrasena: '123456'
    },
    {
        id: 4,
        nombre: 'Instagram',
        usuario: '1140922',
        contrasena: '123456'
    },
    {
        id: 5,
        nombre: 'Twitter',
        usuario: '1140922',
        contrasena: '123456'
    },
]

export const Home = () => {
    const { user } = useContext(AuthContext);
    const cameraRef = useRef(null);

    const notifySuccess = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);
  
    const [contrasena, setContrasena] = useState(null);


    const [verEmergente, setVerEmergente] = useState('');
    const [rutaEmergente, setRutarEmergente] = useState('');




    
    useEffect(() => {
        console.log('user', user);
    }, [user]);

    const handleGuardarContrasena = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const usuario = e.target.usuario.value;
        const contrasena = e.target.contrasena.value;
        console.log('Nombre:', nombre);
        console.log('Usuario:', usuario);
        console.log('Contraseña:', contrasena);
        setVerEmergente('');
        
        notifySuccess("Contraseña guardada correctamente.");
    }

    const handleCapturaFoto = async (fotoBase64) => {


        // Aquí iría el llamado al endpoint que verifica con Rekognition
        // const response = await verificarFoto(fotoBase64);
        const response = { exito: true }; // Simulación por ahora

        if (response.exito) {
            notifySuccess("Identidad verificada");
            console.log("base64: " ,fotoBase64)

            if (rutaEmergente == 'eliminarContrasena') {
                setTimeout(() => {
                    handleEliminarContrasena();
                }, 500);
            } else {
                setTimeout(() => {
                    setVerEmergente(rutaEmergente);
                }, 500);
            }

        } else {
            notifyError("No se pudo verificar tu identidad.");
        }
    }

    const handleVerContrasena = (id)  => {
        const contrasena = jsonContrasenas.find((contrasena) => contrasena.id === id);
        setContrasena(contrasena);

    }

    const handleEliminarContrasena = () => {
        // Aquí iría el código para eliminar la contraseña
        console.log('Contraseña eliminada:', contrasena.id);
        notifySuccess("Contraseña eliminada correctamente.");
    }

    const handleEditarContrasena = (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const usuario = e.target.usuario.value;
        const contrasena = e.target.contrasena.value;
        console.log('Nombre:', nombre);
        console.log('Usuario:', usuario);
        console.log('Contraseña:', contrasena);
        setVerEmergente('');
        
        notifySuccess("Contraseña Editada correctamente.");
    }


    return(
        <>
            
            <div className="mt-12 flex mb-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setVerEmergente('agregarContrasena')}
                >
                    Añadir Contraseña
                </button>
            </div>
 

            <div className="mt-2 grid grid-cols-3 p-4 gap-4">
            {jsonContrasenas.map((contrasena) => (
                <Card key={`${contrasena.id}`} className="bg-bg-200 w-full p-10 rounded-md border-2 border-bg-300">
                    <h1 className="text-3xl font-bold text-center">
                        {contrasena.nombre}
                    </h1>
                    
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="bg-green-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"

                            // definir handleCapturaVerContrasena para handleCaptura 
                            onClick={() => {
                                setRutarEmergente('verContrasena');
                                handleVerContrasena(contrasena.id);    
                                cameraRef.current.open();

                            }}
                        >
                            Ver
                        </button>

                        <button
                            className="bg-blue-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"

                            onClick={() => {
                                setRutarEmergente('editarContrasena');
                                handleVerContrasena(contrasena.id);    
                                cameraRef.current.open();

                            }}
                            
                        >
                            Editar
                        </button>

                        <button
                            className="bg-red-400 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold mr-2"
                            onClick={() => {
                                setRutarEmergente('eliminarContrasena');
                                handleVerContrasena(contrasena.id);    
                                cameraRef.current.open();

                            }}
                        >
                            Eliminar
                        </button>
                        
                        
                    </div>
                </Card>
            ))}

            
            </div>

            {verEmergente == 'agregarContrasena' && (
                <AgregarContrasenas handleGuardarContrasena={handleGuardarContrasena} setVerEmergente={setVerEmergente} />
                )
            }

            {verEmergente == 'verContrasena' && (
                <VerContrasenas contrasena={contrasena} setVerEmergente={setVerEmergente} />
            )}
            
            {verEmergente == 'editarContrasena' && (
                <EditarContrasena contrasena={contrasena} handleEditarContrasena={handleEditarContrasena} setVerEmergente={setVerEmergente} />
            )}

            

            <PhotoCaptureModal
                ref={cameraRef}
                onCapture={handleCapturaFoto}
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

            
        </>
    )

}

export default Home;
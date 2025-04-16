import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

const jsonDocumentos = [
    { id: 1, nombre: 'DNI', linkAWS: 'https://www.google.com' },
    { id: 2, nombre: 'Pasaporte', linkAWS: 'https://www.google.com' },
    { id: 3, nombre: 'Licencia de Conducir', linkAWS: 'https://www.google.com' },
    { id: 4, nombre: 'Certificado de Nacimiento', linkAWS: 'https://www.google.com' },
    { id: 5, nombre: 'Certificado de Estudios', linkAWS: 'https://www.google.com' },
];

export const Documentos = () => {
    const { user } = useContext(AuthContext);
    const [documentos, setDocumentos] = useState(jsonDocumentos);

    const [showModal, setShowModal] = useState(false);
    const [accionPendiente, setAccionPendiente] = useState(null);
    const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
    const [password, setPassword] = useState('');

    const [modalSubir, setModalSubir] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState('');
    const [archivo, setArchivo] = useState(null);

    const handleAccion = (tipo, doc) => {
        setAccionPendiente(tipo);
        setDocumentoSeleccionado(doc);
        setShowModal(true);
    };

    const handleVerificar = () => {
        const exito = true;
        if (exito) {
            if (accionPendiente === 'ver') {
                window.open(documentoSeleccionado.linkAWS, '_blank');
            } else if (accionPendiente === 'eliminar') {
                console.log("es verdadero los datos, voy a eliminar el documento con id", documentoSeleccionado.id);
            }
            cerrarModal();
        } else {
            alert("Contraseña incorrecta o usuario inválido.");
        }
    };

    const cerrarModal = () => {
        setShowModal(false);
        setAccionPendiente(null);
        setDocumentoSeleccionado(null);
        setPassword('');
    };

    const convertirArchivoBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubirDocumento = async () => {
        if (!nuevoNombre || !archivo) {
            alert("Completa ambos campos.");
            return;
        }

        const base64 = await convertirArchivoBase64(archivo);
        console.log("Nombre:", nuevoNombre);
        console.log("Base64:", base64);

        // Aquí podrías hacer un fetch al backend
        setModalSubir(false);
        setNuevoNombre('');
        setArchivo(null);
    };

    return (
        <div className="container mx-auto p-4 mt-14">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-2xl font-bold">Documentos</h1>
                <button
                    onClick={() => setModalSubir(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Subir Documento
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentos.map((doc) => (
                    <div key={doc.id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{doc.nombre}</h2>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleAccion('ver', doc)}
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                                Ver
                            </button>
                            <button
                                onClick={() => handleAccion('eliminar', doc)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

  
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
                        <p className="mb-2">Ingresa tu contraseña para continuar.</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Contraseña"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={cerrarModal} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                            <button onClick={handleVerificar} className="bg-blue-500 text-white px-4 py-2 rounded">Continuar</button>
                        </div>
                    </div>
                </div>
            )}

            {modalSubir && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Subir Documento</h2>
                        <input
                            type="text"
                            value={nuevoNombre}
                            onChange={(e) => setNuevoNombre(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Nombre del documento"
                        />
                        <input
                            type="file"
                            onChange={(e) => setArchivo(e.target.files[0])}
                            className="w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setModalSubir(false)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                            <button onClick={handleSubirDocumento} className="bg-green-500 text-white px-4 py-2 rounded">Subir</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documentos;

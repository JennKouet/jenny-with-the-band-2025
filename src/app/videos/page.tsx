'use client'
import React from 'react';


// Todo: remplacer les liens vers les videos youtube vers des liens dynamiques pointant vers un serveur noSQL (firebase)
const VideosPage = () => {
    return (
        <section className="md:px-64 md:pt-20 bg-black-background relative h-screen z-10" id="videos">
            <div className="flex flex-col items-center md:flex-row md:justify-between md:flex-wrap z-20">
                <div className="w-4/5 md:w-2/4 p-2">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/hsxw5GLyKMs?si=XDX9VEkbATU3nA63" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="w-4/5 md:w-2/4 p-2 ">
                    <iframe width="100%" height="350" src="https://www.youtube.com/embed/-7jZcpJjYCI?si=u8G50YG3PqXfERtp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <div className="w-4/5 md:w-2/4 p-2">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/fYQfW0_8hkg" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className="w-4/5 md:w-2/4 p-2">
                        <iframe width="100%" height="350" src="https://www.youtube.com/embed/Qwnc7Ni3iVc?si=JnEfVTNuMkOZoXNs" title="Try to kill me live video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
        </section>
     );
}

export default VideosPage;
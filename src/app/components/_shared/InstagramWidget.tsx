'use client';

import React, { useEffect } from 'react';

const InstagramWidgetComponent = () => {

    useEffect(() => {
        const script = document.createElement('script');
            script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
    }, []);
    return (
        <iframe
            src="https://cdn.lightwidget.com/widgets/8f416d58199259829b5789afe1491a7e.html"
            className="lightwidget-widget"
            style={{
                width: '100%',
                border: 0,
                overflow: 'hidden',
            }}
        />
    );
}

export default InstagramWidgetComponent;
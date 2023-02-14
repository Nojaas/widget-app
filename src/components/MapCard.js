import React, { useContext } from "react";
import { Context } from "../WidgetApp";

import "../styles/Card.css";

function MapWidget() {
    const { address } = useContext(Context);

    return (
        <div>
            <iframe
                title="Inline"
                className="map"
                width="100%"
                height="100%"
                frameborder="0"
                src={`https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}/>
        </div>
    );
}

export default MapWidget;

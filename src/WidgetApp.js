import { createContext, useState } from "react";
import MapCard from "./components/MapCard";
import WeatherCard from "./components/WeatherCard";

import "./styles/WidgetApp.css";

export const Context = createContext();

const widgets = [MapCard, WeatherCard];

function WidgetApp() {
    const [address, setAddress] = useState("");

    const [openSelector, setopenSelector] = useState(false);

    const [openedWidgets, setOpenedWidgets] = useState([WeatherCard]);

    const addWidget = (widget) => {
        setOpenedWidgets([...openedWidgets, widget]);
        setopenSelector(false);
    };

    const removeWidget = (widget) => {
        const newWidgets = openedWidgets.filter((w) => w !== widget);
        setOpenedWidgets(newWidgets);
    };

  return (
    <div className="container">
        <Context.Provider value={{ address, setAddress, widgets, addWidget, removeWidget }}>

            <div class="search">
                <input type="text" className="searchbar" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter any address.." />
            </div>

            <div className="selector">
                {openSelector && (
                    <div>
                        <div className="selector-content">
                            {widgets.map((Widget, index) => {
                                if (!openedWidgets.some((i) => i === Widget)) {
                                return (
                                    <p key={index} onClick={() => addWidget(Widget)}>{Widget.name}</p>
                                );
                                }
                                return null;
                            })}
                            <button onClick={() => setopenSelector(false)}>&times;</button>
                        </div>
                    </div>
                )}

                <div className="widget-container">
                    {openedWidgets.map((Widget, index) => (
                        <div className="widget" key={index}>
                            <Widget />
                            <div className="close-widget" onClick={() => removeWidget(Widget)}>&times;</div>
                        </div>
                    ))}
                    <button className="addWidget" onClick={() => setopenSelector(true)}>
                        <span>Add widget</span>
                    </button>
                </div>
            </div>
        </Context.Provider>
    </div>
  );
}

export default WidgetApp;

import React, {Component} from "react";
import { MY_ROOM_AREAS } from "./MyRoom.constants";

class MyRoom extends Component {

    state = {
        baseHeight: 725,
        baseWidth: 1200,
        imageUrl: "https://i.imgur.com/LKevMVR.jpg",
        areas: [...MY_ROOM_AREAS],
        color: '#FFFFFF',
        isPreview: false,
    };

    handleColorChange = (area) => {
        this.setState(prevState => {
            const nextAreas =[...prevState.areas];
            const areaIndex = nextAreas.findIndex(i => {
                return i.uid === area.uid;
            });
            nextAreas[areaIndex].color=prevState.color;
            return {areas: nextAreas};
        })

    };

    handleColorPicker = (color) => {
        console.log(color)
        this.setState({color});
    }

    handlePreview = (status) => {
        this.setState(prevState => {
            const nextState = {...prevState};
            nextState.isPreview = status;
            return nextState;
        });
    }
  
    render() {
        const {
            baseWidth, 
            baseHeight, 
            imageUrl,
            areas,
            color,
            isPreview
        } = this.state;
        const svgProps = {
            className: "editor-preview",
            vbox: "0 0 1200 750",
            width: baseWidth,
            height: baseHeight
        };

        const gData = areas.map(area => {
            return (
            <g                           
                className="editor-area"
                key={area.uid}
                onClick={() => this.handleColorChange(area)}>                
                    <path
                        d={area.pathData}
                        fill={area.color ? area.color : 'none'}
                        className={isPreview ?  "editor-area-overlay" : "editor-area-preview"}>
                    </path>                           
            </g>
            );
        });

        return(
            <div id="app">
                <svg 
                   {...svgProps}
                    xmlns="http://www.w3.org/2000/svg">
                         <image x="0" y="0" width="100%" href={imageUrl}/>

                            {gData}
                    </svg>
                    <div className="toolbar">
                        <div>
                        {/* <a className="u-mr-1" ng-href="{{editor.dataUrl}}" download="your-dream-home.png">Download</a> */}
                        <label>
                            <input type="checkbox" onChange={e => this.handlePreview(e.target.checked)} />
                            Show Preview
                        </label>
                        </div>
                        <div className="u-mt-1">
                        <label htmlFor="">Selected Color: </label>
                        <input type="color" value={color} onChange={e => this.handleColorPicker(e.target.value)} /> (Click on area to fill with this color)
                        </div>
                       {isPreview && (<div className="u-muted u-italic u-mt-1">
                        Editor is in preview mode you cannot make changes
                        </div>)}
                    </div>
            </div>
        );
    }
} 

export default MyRoom;
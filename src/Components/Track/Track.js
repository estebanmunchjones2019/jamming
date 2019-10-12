import React from 'react';
import './Track.css';


export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
      }
      renderAction () {
        if (this.props.isRemoval){
            return '-';
        } else if (!this.props.isRemoval){
          return '+';
        }
      }
    render() {
        return (
            <div className="Track">
              <div className="Track-information">
                <h3>Song name being played</h3>
                <p>Track Artist | Track Album</p>
              </div>
              <button className="Track-action">{this.renderAction}</button>
            </div>
        );
    }
};
        

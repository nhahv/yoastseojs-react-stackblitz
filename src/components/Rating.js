import React, { Component } from "react";

class Rating extends Component {
  getIndicatorColor() {
    return this.props.rating;
  }
  render() {
    return (
      <div
        key={this.props.id}
        className={`rating rating--${this.getIndicatorColor()}`}
      >
        <span className="rating__score">
          {this.props.rating} ({this.props.score}/10)
        </span>
        <span dangerouslySetInnerHTML={{ __html: this.props.text }} />
      </div>
    );
  }
}

export default Rating;

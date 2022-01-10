import React, { Component } from "react";
import { helpers } from "yoastseo";
import Presenter from "./Presenter";

class AnalysisResults extends Component {
  summaryScore = () => {
    const { results } = this.props.results;
    const scores = results.map(r => r.score);
    const sum = scores.reduce((a, b) => a + b, 0) / scores.length;
    return parseFloat(sum).toFixed(0);
  };

  getIndicatorColor = () => {
    return helpers.scoreToRating(this.summaryScore());
  };

  render() {
    return (
      <div className={`ratings ratings--${this.getIndicatorColor()}`}>
        <h3 className="ratings__heading">
          {this.props.heading} - {this.getIndicatorColor().toUpperCase()} (
          {Math.max(0, this.summaryScore())}/10)
        </h3>
        <Presenter assessor={this.props.results} />
      </div>
    );
  }
}

export default AnalysisResults;

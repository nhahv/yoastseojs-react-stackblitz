import React, { Component } from "react";
import { helpers } from "yoastseo";
import Rating from "./Rating";

class Presenter extends Component {
  isObject(obj) {
    var type = typeof obj;
    return type === "function" || (type === "object" && !!obj);
  }

  getScores() {
    const scores = this.props.assessor.getValidResults().map(r => {
      if (!this.isObject(r) || !r.getIdentifier()) {
        return ``;
      }
      r.rating = helpers.scoreToRating(r.score);
      return r;
    });

    console.log("scores", scores);

    return scores.filter(a => a !== "");
  }
  addRating(item) {
    return {
      rating: item.rating,
      text: item.text,
      identifier: item.getIdentifier(),
      score: item.score
    };
  }

  render() {
    let ratings = [];
    Object.entries(this.getScores()).forEach(([key, item]) => {
      ratings.push(this.addRating(item));
    });

    return (
      <div>
        {ratings
          .sort((a, b) => {
            // First compare the score.
            if (a.score < b.score) {
              return -1;
            }
            if (a.score > b.score) {
              return 1;
            }
            // If there is no difference then compare the id.
            return a.id - b.id;
          })
          .map(r => (
            <Rating
              key={r.identifier}
              id={r.identifier}
              rating={r.rating}
              text={r.text}
              score={r.score}
            />
          ))}
      </div>
    );
  }
}

export default Presenter;

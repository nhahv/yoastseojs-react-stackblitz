import React, { Component } from "react";
import { Paper, SeoAssessor, ContentAssessor, helpers } from "yoastseo";
import Jed from "jed";
import AnalysisResults from "./../components/AnalysisResults";
import {
  contents,
  title,
  url,
  permalink,
  description,
  keyword,
  synonyms
} from "./contents";

class App extends Component {
  constructor(props) {
    super(props);

    this.contentAssessor = new ContentAssessor(this.i18n());
    this.seoAssessor = new SeoAssessor(this.i18n());

    this.state = {
      paper: new Paper(contents, {
        title,
        titleWidth: helpers.measureTextWidth(title),
        description,
        url,
        permalink,
        keyword,
        synonyms,
        locale: "en_US"
      }),
      text: contents
    };

    this.assessContent(this.state.paper);
    this.assessSEO(this.state.paper);
  }

  i18n = () => {
    return new Jed({
      domain: `js-text-analysis`,
      locale_data: {
        "js-text-analysis": {
          "": {}
          // "%1$sSEO title width%3$s: The SEO title is wider than the viewable limit. %2$sTry to make it shorter%3$s.": [
          //   "%1$sJudul SEO%3$s melebihi batas yang dapat dilihat. %2$sCobalah untuk membuatnya lebih pendek%3$s."
          // ]
        }
      }
    });
  };

  changePaper = (item) => {
    const data = Object.assign(
      {},
      {
        text: this.state.text,
        keyword: this.state.paper.getKeyword(),
        synonyms: this.state.paper.getSynonyms(),
        description: this.state.paper.getDescription(),
        title: this.state.paper.getTitle(),
        titleWidth: helpers.measureTextWidth(this.state.paper.getTitle()),
        url: this.state.paper.getUrl(),
        locale: "id_ID",
        permalink: this.state.paper.getPermalink()
      },
      item
    );

    const { text, ...dataWithoutText } = data;

    const paper = new Paper(text, dataWithoutText);
    this.setState({ paper });
    this.assessContent(paper);
    this.assessSEO(paper);
  };

  changeTitle = (event) => {
    this.changePaper({ title: event.target.value });
  };

  changeText = (event) => {
    this.setState({ text: event.target.value });
    this.changePaper({ text: event.target.value });
  };

  changeKeyword = (event) => {
    this.changePaper({ keyword: event.target.value });
  };

  changeSynonyms = (event) => {
    this.changePaper({ synonyms: event.target.value });
  };

  changeUrl = (event) => {
    const { value } = event.target;
    const splittedValue = value.split("/");
    const url = splittedValue[splittedValue.length - 1];
    this.changePaper({ permalink: event.target.value, url });
  };

  changeDescription = (event) => {
    this.changePaper({ description: event.target.value });
  };

  research = (paper) => {
    this.researcher.setPaper(paper);

    let keys = Object.keys(this.researcher.getAvailableResearches());
    let values = keys.map((r) => this.researcher.getResearch(r));
    return keys.reduce((prev, prop, i) => {
      return Object.assign(prev, { [prop]: values[i] });
    }, {});
  };

  assessContent = (paper) => {
    this.contentAssessor.assess(paper);
  };

  assessSEO = (paper) => {
    this.seoAssessor.assess(paper);
  };

  render() {
    console.log("this.seoAssessor", this.seoAssessor);
    console.log("this.seoAssessor.results", this.seoAssessor.results.length);
    return (
      <div className="App">
        <h1>ENV</h1>
        <code>{JSON.stringify(process.env)}</code>
        <div className="wrapper">
          <form className="form">
            <div className="form__group">
              <label htmlFor="title" className="form__label">
                Title
              </label>
              <input
                type="text"
                className="input"
                id="title"
                onChange={this.changeTitle}
                value={this.state.paper.getTitle()}
              />
            </div>
            <div className="form__group">
              <label htmlFor="text" className="form__label">
                Content
              </label>
              <textarea
                className="input"
                id="text"
                onChange={this.changeText}
                value={this.state.text}
              />
              <p className="form__description">Supports Markdown</p>
            </div>
            <div className="form__group">
              <label htmlFor="keyword" className="form__label">
                Focus Keyword
              </label>
              <input
                type="text"
                className="input"
                id="keyword"
                onChange={this.changeKeyword}
                value={this.state.paper.getKeyword()}
              />
            </div>
            <div className="form__group">
              <label htmlFor="synonyms" className="form__label">
                Keywords Synonyms
              </label>
              <input
                type="text"
                className="input"
                id="synonyms"
                onChange={this.changeSynonyms}
                value={this.state.paper.getSynonyms()}
              />
            </div>
            <div className="form__group">
              <label htmlFor="url" className="form__label">
                URL
              </label>
              <input
                type="url"
                className="input"
                id="url"
                onChange={this.changeUrl}
                value={this.state.paper.getPermalink()}
              />
            </div>
            <div className="form__group">
              <label htmlFor="meta-description" className="form__label">
                Meta Description
              </label>
              <textarea
                className="input"
                id="meta-description"
                onChange={this.changeDescription}
                value={this.state.paper.getDescription()}
              />
            </div>
          </form>

          <div className="output">
            <AnalysisResults
              heading={"Content"}
              results={this.contentAssessor}
            />
            <AnalysisResults heading={"SEO"} results={this.seoAssessor} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

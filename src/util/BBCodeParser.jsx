import React from "react";
import { Parser, Tag } from "bbcode-to-react";
import JournalSection from "../components/JournalSection";
import PhotoCard from "../components/PhotoCard";
import FakeBr from "../components/basic/FakeBr";

const BBCodeContext = React.createContext();

const convertNewlines = (component) => {
  if (typeof component === "string") {
    let parts = component.split(/\r?\n\r?\n/g);

    parts = parts.reduce((a, v, k) => {
      a.push(
        <React.Fragment key={"br_" + k}>
          <FakeBr />
        </React.Fragment>
      );
      a.push(<React.Fragment key={"v_" + k}>{v}</React.Fragment>);

      return a;
    }, []);

    parts.shift();

    return parts;
  }

  return component;
};

class SectionTag extends Tag {
  toReact() {
    return (
      <BBCodeContext.Consumer>
        {(context) => {
          const attributes = {
            location:
              context.mapLocationStore.findLocation(this.params.location) ||
              undefined,
            detached: this.params.detached === "true" || false,
            startTime: this.params.startTime,
            endTime: this.params.endTime
          };

          return (
            <JournalSection {...attributes}>
              {this.getComponents().map(convertNewlines)}
            </JournalSection>
          );
        }}
      </BBCodeContext.Consumer>
    );
  }
}

class PhotoTag extends Tag {
  toReact() {
    const photoId = this.getContent(true);

    return (
      <BBCodeContext.Consumer>
        {(context) => (
          <PhotoCard photo={context.page.findPhoto(photoId)} size={96} />
        )}
      </BBCodeContext.Consumer>
    );
  }
}

class QuoteTag extends Tag {
  toReact() {
    return <blockquote>{this.getComponents().map(convertNewlines)}</blockquote>;
  }
}

class RootTag extends Tag {
  toReact() {
    return this.getComponents().map(convertNewlines);
  }
}

const parser = new Parser(["b", "i", "s", "list", "*", "url"]);
const liteParser = new Parser(["b", "i", "s", "list", "*", "url"]);

parser.registerTag("section", SectionTag);
parser.registerTag("photo", PhotoTag);
parser.registerTag("quote", QuoteTag);

liteParser.registerTag("quote", QuoteTag);
liteParser.registerTag("root", RootTag);

export default parser;
export { liteParser, BBCodeContext };

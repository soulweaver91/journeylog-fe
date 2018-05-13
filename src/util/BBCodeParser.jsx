import React from "react";
import { Parser, Tag } from "bbcode-to-react";
import JournalSection from "../components/JournalSection";
import PhotoCard from "../components/PhotoCard";

export const BBCodeContext = React.createContext();

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
              {this.getComponents().map((component) => {
                if (typeof component === "string") {
                  let parts = component.split(/\r?\n\r?\n/g);

                  parts = parts.reduce((a, v, k) => {
                    a.push(
                      <React.Fragment key={"br_" + k}>
                        <br />
                      </React.Fragment>
                    );
                    a.push(<React.Fragment key={"v_" + k}>{v}</React.Fragment>);

                    return a;
                  }, []);

                  parts.shift();

                  return parts;
                }

                return component;
              })}
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
        {(context) => <PhotoCard photo={context.journey.findPhoto(photoId)} />}
      </BBCodeContext.Consumer>
    );
  }
}

const parser = new Parser(["b", "i", "s", "list", "*", "quote"]);

parser.registerTag("section", SectionTag);
parser.registerTag("photo", PhotoTag);

export default parser;

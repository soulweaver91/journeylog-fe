import React from 'react';
import { Parser, Tag } from 'bbcode-to-react';
import JournalSection from "../components/JournalSection";
import PhotoCard from "../components/PhotoCard";

export const BBCodeContext = React.createContext();

class SectionTag extends Tag {
  toReact() {
    return (
      <BBCodeContext.Consumer>
        {(context) => {
          const attributes = {
            location: context.mapLocationStore.findLocation(this.params.location) || undefined,
            detached: this.params.detached === "true" || false
          };

          return (<JournalSection {...attributes}>{this.getComponents()}</JournalSection>);

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
          <PhotoCard photo={context.journey.findPhoto(photoId)} />
        )}
      </BBCodeContext.Consumer>
    );
  }
}

const parser = new Parser(['b', 'i', 's', 'list', '*', 'quote']);

parser.registerTag('section', SectionTag);
parser.registerTag('photo', PhotoTag);

export default parser;

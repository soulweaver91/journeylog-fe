import React from 'react';
import { Parser, Tag } from 'bbcode-to-react';
import JournalSection from "../components/JournalSection";
import PhotoCard from "../components/PhotoCard";

export const BBCodeContext = React.createContext();

class SectionTag extends Tag {
  toReact() {
    const attributes = {
      location: this.params.location || undefined,
      connected: this.params.connected === "true" || false
    };

    return (
      <JournalSection {...attributes}>{this.getComponents()}</JournalSection>
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

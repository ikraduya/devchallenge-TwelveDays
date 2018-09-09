import React, { Component } from 'react';
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';

/**
 * Show loading component with size of full parent element. This component will monitor following item:
 * 1. <style> tag with id, will be compared to stylesheet loaded in document.sylesheet
 * 2. <src> tag, will be compared to images downloaded in document.images
 * 3. All tags that have inline background image css like <* style="background: url()" />. All image url
 *    will be parsed then rendered as hidden image so can be monitored with <img> tag above
 * @param {string || array} targetIds id that implemented in <style> tag to monitor
 * @param {boolean} waitImage flag to wait image loading also
 */
class LoadingCSS extends Component {
  constructor(props) {
    super(props);
    this.checkIfAssetLoaded = this.checkIfAssetLoaded.bind(this);
    this.state = {
      cssLoaded: false,
      imagesLoaded: false,
      backgroundImages: [],
    };
  }
  componentDidMount() {
    if (this.props.waitImage || this.props.targetIds.length) {
      this.checkIfAssetLoaded();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.checkAssetLoaded);
  }
  checkIfAssetLoaded() {
    const { targetIds, waitImage } = this.props;
    const { imagesLoaded, cssLoaded, backgroundImages } = this.state;
    let newImagesLoaded = imagesLoaded;
    let newCssLoaded = cssLoaded;
    
    // make sure searchTargetIds is always array
    let searchTargetIds = targetIds ? [targetIds] : [];
    if (targetIds && typeof targetIds === 'object') searchTargetIds = targetIds;
    
    // compare all stylesheet loaded in document with stylesheet monitored in this component
    // iterate on every stylesheet id that will be checked, if stylesheet already loaded, 
    // remove from the search array
    if (!cssLoaded && searchTargetIds.length > 0) {
      Array.from(document.styleSheets).forEach((styleSheet) => {
        if (styleSheet.ownerNode) {
          const index = searchTargetIds.indexOf(styleSheet.ownerNode.id);
          if (index >= 0) {
            searchTargetIds.splice(index, 1);
          }
        }
      });
    }
    if (targetIds && searchTargetIds.length === 0) {
      newCssLoaded = true;
      this.setState({ cssLoaded: true });
    }

    if (!imagesLoaded && waitImage) {
      // get all image registered with inline css as background to be rendered later
      const newBackgroundImage = Array.from(document.querySelectorAll('[style*=background]'))
        .filter(bg => bg.style.backgroundImage)
        .map(bg => bg.style.backgroundImage.substring(5, bg.style.backgroundImage.length - 2));
      if (newBackgroundImage.length !== backgroundImages.length) {
        this.setState({ backgroundImages: newBackgroundImage });
      }

      // check all image loaded in document if it's downloaded or no
      const imageNotYetCompleted = Array.from(window.document.images).filter(image => !image.complete).length;
      if (imageNotYetCompleted === 0) {
        newImagesLoaded = true;
        this.setState({ imagesLoaded: true });
      }
    }
    
    if ((!newImagesLoaded && waitImage) || !newCssLoaded) {
      this.checkAssetLoaded = setTimeout(this.checkIfAssetLoaded.bind(this), 100);
    }
  }

  render() {
    const { cssLoaded, imagesLoaded, backgroundImages } = this.state;
    const { waitImage } = this.props;
    if (cssLoaded && ((waitImage && imagesLoaded) || (!waitImage))) return '';

    const style = `
    html, body, .App, .App > div, #root, .loading {
      width: 100%;
      height: 100%;
    }
    
    .loading {
      display: table;
      position: fixed;
      background: white;
      z-index: 1050;
    }
    
    .loading > div {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    
    .loading > .hidden-loading-image {
      display: none
    }
    `;
    return (
      <div className="loading">
        <style>{style}</style>
        <BeatLoader color="#e53935" size={15} margin="10px" />
        {/* Render background image so can be tracked if image loaded or no */}
        {backgroundImages.map((image, index) => <img className="hidden-loading-image" key={index} src={image} alt={image} />)}
      </div>
    );
  }
}

LoadingCSS.propTypes = {
  targetIds: PropTypes.any,
  waitImage: PropTypes.bool,
};

LoadingCSS.defaultProps = {
  targetIds: [],
  waitImage: false,
};

export default LoadingCSS;

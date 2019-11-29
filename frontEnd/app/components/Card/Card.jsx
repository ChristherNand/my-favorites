import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {CardPropType} from '../../propsTypes';
import './Card.css';

import Icon from '../generals/Icon';
import Tag from '../generals/Tag';
import Tooltip from '../generals/Tooltip';
import {removeTagLink} from "../../state/actions";

const mapDispachToProps = dispatch => ({
    removeTagLink: (linkId, tagId) => dispatch(removeTagLink(linkId, tagId)),
  })

function Card(props) {
  const {id = 0, title, url, tags = []} = props;
  const containerUrl = useRef(null);
  const [isContHover, setIsContHover] = useState(false);

  function removeTag(tagId) {
    props.removeTagLink(props.id, tagId);
  }
  
  function removeCard() {
    console.log("cardId", props.id)
  }

  return  <div className="card">
            <a className="linkTitle" href={url} target="_blank">
              <h2 className="title">{title}</h2>
            </a>

            <p className="description --ellipsis">
              Donec in venenatis metus. Suspendisse potenti. Cras ultricies turpis sit amet massa suscipit, in egestas sapien finibus. 
              Quisque id massa pretium felis auctor mattis. Donec elementum est ut nisi finibus auctor. Duis pretium ipsum eget orci eleifend, 
              quis luctus nisl suscipit. Proin odio velit, mattis sit amet eros vitae, tristique posuere sem.
            </p>

            {/* <div className="card__cont"onMouseEnter={() => setIsContHover(true)} onMouseLeave={() => setIsContHover(false)}>
                <Tooltip text={url} hover={isContHover} parentRef={containerUrl}/>
            </div> */}

            <div className="card__cont contTags --flex --wrap">{
              tags.map((tag, index) => {
                return <Tag key={`${id}-${index}`}
                            updateDisable={true} {...tag}
                            onClose={() => removeTag(tag.id)}
                        />
              })}
            </div>
            <div className="card_options --flex">
              <div className="loading">
                <Icon name="edit" onClick={removeCard} className={"edit iconHover"} pointer={true}/>
              </div>
              <div className="loading">
                <Icon name="close" onClick={removeCard} className={"close iconHover"} pointer={true}/>
              </div>
            </div>
          </div>
}

Card.propTypes = CardPropType

export default connect(null, mapDispachToProps)(Card);

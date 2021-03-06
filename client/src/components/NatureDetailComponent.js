import React, {Component} from 'react';
import {
  Card, CardImg, CardText, CardBody, Modal,
  CardTitle, Button,
  ModalHeader, ModalBody,
  Row, Col, Label
} from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';

function RenderNature({ nature, favorite, postFavorite }) {
  if (nature != null) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
          <Card>
            <CardImg top src={nature.image} alt={nature.name} />
            <Button outline color='primary' 
                    onClick={() => favorite ? console.log('Already favorite') : postFavorite(nature._id)}>
              { favorite ? 
                  <span className="fa fa-heart"></span>
                  :
                  <span className="fa fa-heart-o"></span>
              }
            </Button>
            <CardBody>
              <CardTitle> {nature.name} </CardTitle>
              <CardText> {nature.description} </CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    )
  } else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments, postComment, natureId, authorName }){

  if(comments != null) {
    const CommentsSummary = comments.map((comment) => {
      let comment_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
        .format(new Date(Date.parse(comment.date)));

      var elements = [];
      for(let i =0; i < comment.rating; i++){
        elements.push(<i className="fa fa-star fa-lg yellow100"></i>);
      }
      for(let i =0; i < 5 - comment.rating; i++){
        elements.push(<i className="fa fa-star-o fa-lg yellow100"></i>);
      }
        

      return (
        <Fade in key = {comment._id}>
        <Card>
            <h5> Description </h5>
            <p>{comment.comment}</p>
            <h6>Rating:</h6>
            <span>
              {elements}
            </span>
            <p>- - {comment.author}, {comment_date}</p> 
        </Card>
        </Fade>
      );
    });
    return (
      <div className='col-12 col-md-5 m-1'>
        <Card>
          <CardTitle>
            <h3>Comments</h3>
          </CardTitle>
          <CardBody>
            <Stagger in>
              {CommentsSummary}
            </Stagger>
            <CommentForm natureId={natureId} postComment={postComment} authorName={authorName}/>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div/>
  }
}

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    console.log('authorName=' + this.props.authorName);
    this.props.postComment(this.props.natureId, values.rating, this.props.authorName, values.comment);
  }

  render(){
    return (
      <div>
        <Button outline onClick={this.toggleModal}><span className='fa fa-edit fa-lg'></span>
          Summit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Summit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Label htmlFor='rating' md={2}>Rating</Label>
                <Col md={10}>
                <Control.select model='.rating' id='rating' name='rating'
                    placeholder='rating'
                    className='form-control'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment'>Comment</Label>
                <Col md={10}>
                 <Control.textarea model='.comment' id='comment' name='comment'
                    rows='6'
                    className='form-control' />
                </Col>
              </Row>
              <Button type='submit' value='submit' color='primary'>Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


function NatureDetailContent({ props }) {
  if (props.isLoading) {
    return (
      <Loading />
    );
  } else if (props.errMess != null) {
    return (
      <h4>{props.errMess}</h4>
    )
  } else {
    return (
      <div className='container2'>
        <div className='row'>
          <div className='col-12'>
            <h3>{props.nature.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderNature 
            nature={props.nature}
            favorite={props.favorite} 
            postFavorite={props.postFavorite} 
          />
          <RenderComments 
            comments = {props.comments}
            postComment = {props.postComment}
            natureId = {props.nature._id}
            authorName = {props.authorName}
          />
        </div>
      </div>
    )
  }
}

function NatureDetail(props) {
  return (
    <div className='container2'>
      <div className='row'>
        <div className='col-12'>
          <h1>Nature</h1>
          <hr />
        </div>
      </div>
      <div className='row'>
        <NatureDetailContent props={props} />
      </div>
    </div>
  )
}

export default NatureDetail;
import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactMic } from 'react-mic';

const RecordButton = styled.button`
	color: white;
	background-color: black;
	padding: 10px;
	border: none;
	font-size: 14px;
	margin: 20px 20px;
	border-radius: 80px;
	width: 80px;
	height: 80px;

	:hover {
		background-color: blue;
	}
`
const MixButton = styled.button`
	color: white;
	background-color: red;
	padding: 10px;
	border: none;
	font-size: 14px;
	border-radius: 50px;
	margin-top: 20px;

	:hover {
		background-color: rgba(255,0,0,0.7);
	}
`


function ReplayButton(props) {
	let soundFile = props.file;
	let replayIndex = props.index;

	function play () {
		var audioSource = new Audio();
		audioSource.src = soundFile
		audioSource.play();
	}

	return (
		<div>
			<MixButton onClick={play}>Replay Sound {replayIndex + 1}</MixButton>
		</div>
	)
}

class Record extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      record: false,
	      recordFile: []
	    }

	    this.onStop = this.onStop.bind(this);
  	}

	startRecording = () => {
	    this.setState({
	      record: true
	    });
	}

	stopRecording = () => {
	    this.setState({
	      record: false
	    });
	}

	onData(recordedBlob) {
	    // console.log('chunk of real-time data is: ', recordedBlob);
	}

	onStop(recordedBlob) {
	    // console.log('recordedBlob is: ', recordedBlob);
	    this.setState(prevState => ({
	    	recordFile: [...prevState.recordFile, recordedBlob.blobURL]
	    }))
	}

	render() {
		const list = this.state.recordFile.map((item, i) => {
			return <ReplayButton key={i} file={item} index={i}/>
		})


		return (
			<div>
			<ReactMic
				record={this.state.record}
		        className="sound-wave"
		        onStop={this.onStop}
		        onData={this.onData}
		        strokeColor="#ffffff"
		        backgroundColor="#000000" />
			<div>
				<RecordButton onClick={this.startRecording}>START</RecordButton>
				<RecordButton onClick={this.stopRecording}>STOP</RecordButton>

				{list}
			</div>
			</div>
		)
	}
}

export default Record;





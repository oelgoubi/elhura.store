import React, {Component, Fragment} from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

const fileService = require('../../services/file');

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

class FileUpload extends Component {
    constructor() {
        super();

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            isError: false,
            fileInfos: [],
        };

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
    }

    async componentDidMount() {
        try{
            const response = await fileService.getFiles();

            this.setState({
                fileInfos: response.data,
            });
        }catch(error) {
            console.log(error)
        }
    }

    selectFile(event) {
        console.log(event.target.files)
        this.setState({
            selectedFiles: event.target.files
        })
    }

    async upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile
        })

        try {
            const response = await fileService.upload(currentFile, (event) => {
                this.setState({
                    progress: Math.round((100 * event.loaded) / event.total)
                })
            })

            this.setState({
                message: response.data.message,
                isError: false
            })

            const responseGetFiles = await fileService.getFiles()

            this.setState({
                fileInfos: responseGetFiles.data
            })
        } catch(error) {
            console.log("Error : "+error)
            this.setState({
                progress: 0,
                message: "Could not upload the file!",
                currentFile: undefined,
                isError: true
            });
        }
        this.setState({
            selectedFiles: undefined,
        });
    }

    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
            isError
        } = this.state;

        return (
            <div className="mg20">
                {currentFile && (
                    <Box className="mb25" display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                            <BorderLinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                        </Box>
                    </Box>)
                }

                <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        onChange={this.selectFile} />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span" >
                        Choose Files
                    </Button>
                </label>
                <div className="file-name">
                    {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
                </div>
                <Button
                    className="btn-upload"
                    color="primary"
                    variant="contained"
                    component="span"
                    disabled={!selectedFiles}
                    onClick={this.upload}>
                    Upload
                </Button>

                <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
                    {message}
                </Typography>

                <Typography variant="h6" className="list-header">
                    List of Files
                </Typography>
                <ul className="list-group">
                    {fileInfos &&
                    fileInfos.map((file, index) => (
                        <ListItem
                            divider
                            key={index}>
                            <a href={file.url}>{file.name}</a>
                        </ListItem>
                    ))}
                </ul>
            </div >
        );
    }
}

export default FileUpload;
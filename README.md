# timer

This is a very simple Time-Tracker that works from the Command-Line.

## Installation

`npm install -g my-timer`

## Configuration

Create a File _.timer-config.json_ in your Home-Directory, which looks like this:

```json
{
  "file": "/path/to/save/file.csv",
  "results":"/path/to/save/results.csv",
  "myName": "Show in HTML"
}
```

* file: The CSV-File to write the times to. Format: thing;timestamp
* results: The HTML-File containing the calculated Results
* myName: Your Name in the HTML-File!

## Usage

To add a time just call:  
`timer <thing>`

Where <thing> is of your choice. You may use work, break, meeting, ...  
Whatever you like!

To get a nice HTML with calculated results (table of things and times, resulting Times for things):
`timer-calc`

## Contribution

Look at the Code and then fork it and create a pull-request.  
Id love to hear your suggestions!

## Author

* Dominik Sigmund <dominik.sigund@webdad.eu>

## License

See LICENSE

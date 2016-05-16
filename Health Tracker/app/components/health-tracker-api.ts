import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class HealthTrackerApi {
    scriptId = "McZMJRieYn9AIvS5mGFXJXj6X9oL3FfIU";

    constructor(private http: Http) {
        console.log("ht api con start");
    }

    /**
       * Calls an Apps Script function to list the folders in the user's
       * root Drive folder.
       */
      callScriptFunction() {

        // Create an execution request object.
        var request = {
            'function': 'getFoldersUnderRoot'
            };

        // Make the API request.
        var op = gapi.client.request({
            'path': 'v1/scripts/' + this.scriptId + ':run',
            'method': 'POST',
            'body': request
        });

        op.execute(function(resp) {
          if (resp.error && resp.error.status) {
            // The API encountered a problem before the script
            // started executing.
            this.appendPre('Error calling API:');
            this.appendPre(JSON.stringify(resp, null, 2));
          } else if (resp.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details.
            // The values of this object are the script's 'errorMessage' and
            // 'errorType', and an array of stack trace elements.
            var error = resp.error.details[0];
            this.appendPre('Script error message: ' + error.errorMessage);

            if (error.scriptStackTraceElements) {
              // There may not be a stacktrace if the script didn't start
              // executing.
                this.appendPre('Script error stacktrace:');
              for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                var trace = error.scriptStackTraceElements[i];
                this.appendPre('\t' + trace.function + ':' + trace.lineNumber);
              }
            }
          } else {
            // The structure of the result will depend upon what the Apps
            // Script function returns. Here, the function returns an Apps
            // Script Object with String keys and values, and so the result
            // is treated as a JavaScript object (folderSet).
            var folderSet = resp.response.result;
            if (Object.keys(folderSet).length == 0) {
                this.appendPre('No folders returned!');
            } else {
                this.appendPre('Folders under your root folder:');
              Object.keys(folderSet).forEach(function(id){
                  this.appendPre('\t' + folderSet[id] + ' (' + id  + ')');
              });
            }
          }
        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
}
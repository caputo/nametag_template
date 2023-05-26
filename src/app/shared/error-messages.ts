/**
 * A centralized place to see all error messages used throughout the
 * app. Having them in one place both makes testing for error messages
 * easier and simplifies things like i18n in the future.
 */
export class AppMessagesDefault {
  static readonly CREATE_DUPLICATE_NAMETAG =
    "Can't create this nametag as it already exists.";

  static readonly UPDATE_NONEXISTENT_NAMETAG =
    "Can't update this nametag because it doesn't already " +
    "exist. Try creating it first.";

  static readonly FETCH_NONEXISTENT_NAMETAG =
    "Can't fetch this nametag because it doesn't exist.";

  static readonly CREATE_DUPLICATE_NAMETAG_TEMPLATE =
    "Can't create this template as it already exists.";

  static readonly UPDATE_NONEXISTENT_NAMETAG_TEMPLATE =
    "Can't update this template because it doesn't already " +
    "exist. Try creating it first.";

  static readonly FETCH_NONEXISTENT_NAMETAG_TEMPLATE =
    "Can't fetch this template because it doesn't exist.";

  static readonly UPDATE_NAMETAG_SUCESSFULL =
    "Nametag successfully updated !";

  static readonly CREATE_TEMPLATE_SUCESS =
    "Template successfully created!";

    static readonly CREATE_TEMPLATE_ALERT_FIELD =
    "Please fill all the required fields!";

  static readonly UPDATE_TEMPLATE_SUCESS =
    "Template successfully created!";
}
/*
* Indicates the level message in order to present in the screen
*/
export enum MessageLevel {
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING"
}

/** Class to send event message */
export class AppMessage {
  //The text to be showed in the screen
  message: string;
  //The message level
  level: MessageLevel;
}
/**
 * A centralized place to see all error messages used throughout the
 * app. Having them in one place both makes testing for error messages
 * easier and simplifies things like i18n in the future.
 */
export class ErrorMessages {
  static readonly CREATE_DUPLICATE_NAMETAG =
    "Can't create this nametag as it already exists.";

  static readonly UPDATE_NONEXISTENT_NAMETAG =
    "Can't update this nametag because it doesn't already " +
    "exist. Try creating it first.";

  static readonly FETCH_NONEXISTENT_NAMETAG =
    "Can't fetch this nametag because it doesn't exist.";
}

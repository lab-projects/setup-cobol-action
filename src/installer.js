const exec = require('@actions/exec');
const os = require('os');
const path = require('path');

class UnsupportedOSError extends Error {
  constructor(message) {
    super(message);
  }
}

class UnsupportedVersionError extends Error {
  constructor(message) {
    super(message);
  }
}

class Installer {

  constructor(version) {
    this.version = version;
    this.SUPPORTED_VERSIONS = ['3.0-rc1'];
  }

  _execFileName() {
    const osType = os.type();
    if (osType === 'Linux') {
      return 'install-cobol-linux.sh';
    }
    throw new UnsupportedOSError(
      `${osType} is not supported. fabasoad/setup-cobol-action only supports Ubuntu Linux at this time.`
    );
  }

  async install() {
    if (!this.SUPPORTED_VERSIONS.includes(this.version)) {
      throw new UnsupportedVersionError(`Version ${this.version} is not supported.`);
    }
    await exec.exec(path.join(__dirname, this._execFileName()), [ this.version ]);
  }
}

module.exports = { Installer, UnsupportedOSError, UnsupportedVersionError };
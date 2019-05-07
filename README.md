# ImgPaste

A simple pastebin application that only accepts images. I wrote this application 
primarily to trial and evaluate [Nim language](https://nim-lang.org/).

## Install

* Install [Nim](https://nim-lang.org/install.html) which also installs Nimble, the
package manager.
* Clone the `imgpaste` code:
  ```
  git clone https://github.com/theju/imgpaste.git
  ```
* Install the dependencies through Nimble
  ```
  cd imgpaste
  nimble build
  ```
* Run the server:
  ```
  ./imgpaste [--port=<port_num>]
  ```

## License

MIT License. Refer to the `LICENSE` file for more details.

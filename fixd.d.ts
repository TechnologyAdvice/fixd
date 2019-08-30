declare const fixd: {
  /**
   * Deeply freezes an object
   * @param {*} obj The object to freeze
   * @returns {*}
   */
  readonly freeze: (obj: any) => any;
  /**
   * Retrieves a value from the fixd library
   * @param {Object} target Target object to retrieve from
   * @param {String} name Property name to retrieve
   * @returns {*} The value of the property
   */
  readonly get: (target: any, name: string | symbol) => any;
  /**
   * Add a property to the fixd library and freezes if not in namespace
   * @param {Object} obj The object to set
   * @param {String} prop A string name to represent the fixture
   * @param {*} value The value to set
   * @returns {Boolean}
   */
  readonly set: (obj: any, prop: string | symbol, value: any) => boolean;
  /**
   * Returns a fixture and allows for (option) modification
   * @param {String} name The namespace of the fixture to mutate
   * @param {Function} modifier A function to modify the fixture
   * @returns {*} Unreferenced, immutable copy of object
   */
  readonly create: (name: string | symbol, modifier: (obj: any) => any) => any;

  [key: string]: any;
};

export = fixd

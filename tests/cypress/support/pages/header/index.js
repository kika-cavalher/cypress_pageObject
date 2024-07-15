require('cypress-xpath');

import {el} from './elements.js'
import header from '../../components/header/index.js'

class DashPage {
    constructor() {
        this.header = header
    }
}

export default new DashPage()
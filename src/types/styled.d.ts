import 'styled-components';
import { GlobalToken } from 'antd/es/theme/interface';

declare module 'styled-components' {
    export interface DefaultTheme {
        token: GlobalToken;
    }
}

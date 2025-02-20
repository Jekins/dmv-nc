import 'styled-components';
import type { GlobalToken } from 'antd/es/theme';

declare module 'styled-components' {
    export interface DefaultTheme {
        token: GlobalToken;
    }
}

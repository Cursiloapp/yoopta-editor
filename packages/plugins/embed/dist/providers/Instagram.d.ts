import React from 'react';
type InstagramProps = {
    provider: {
        id: string;
        url: string;
    };
    width: number | 'auto';
    height: number | 'auto';
    blockId: string;
    attributes: any;
    children: React.ReactNode;
};
declare const Instagram: React.FC<InstagramProps>;
export default Instagram;
//# sourceMappingURL=Instagram.d.ts.map
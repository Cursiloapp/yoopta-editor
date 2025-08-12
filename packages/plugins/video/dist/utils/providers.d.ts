import { VideoProviderTypes } from '../types';
export declare const getYoutubeId: (url: string) => string | null;
export declare const getVimeoId: (url: string) => string;
export declare const getDailymotionId: (url: string) => string | null;
export declare const getWistiaId: (url: string) => string | null;
export declare const getLoomId: (url: string) => string | null;
export declare function getProvider(url: string): VideoProviderTypes | null;
export declare const ProviderGetters: {
    youtube: (url: string) => string | null;
    vimeo: (url: string) => string;
    dailymotion: (url: string) => string | null;
    loom: (url: string) => string | null;
    wistia: (url: string) => string | null;
};
//# sourceMappingURL=providers.d.ts.map
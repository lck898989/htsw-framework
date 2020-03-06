/**
 *   处理消息号的类
 */

namespace MsgType {
    export enum MSG {
        SV_LOGIN = 2000,   // 登陆
        PLAYER_HEART_INFO = 2101, // 心跳消息
        SV_ADD_BLOCK = 3001, // 拉黑
        SV_CHAT = 3000, // 聊天
        SV_DEL_ONECHAT = 3002, // 删除指定Id聊天记录
        SV_DEL_BLOCK = 3003, // 解除对玩家的屏蔽

        // 在这上面添加消息号，注意消息号以逗号结尾
        MSG_END,
    }

}

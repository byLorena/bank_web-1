export interface DataTypeDeposit {
    id: number
    amount: number;
    fromAddress: string;
    when: Date;
    updateDate: Date;
}

export interface DataTypeWithdrawls {
    id: number;
    amount: number;
    toAddress: string;
    wasApprovedByUser2FA: boolean;
    when: Date;
    updateDate: Date;
}

export interface DataTypeTradeOrder {
    id: number;
    amount: number;
    tradeOrderType: {
        name: string;
    };
    when: Date;
    updateDate: Date;
}
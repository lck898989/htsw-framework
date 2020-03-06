
/**
 *  hahsMap
 */
class HashMap {
    private _keys: any[] = null;
    private props: Object = null;

    public constructor() {
        this.clear();
    }

    public clear(): void {
        this.props = new Object();
        this._keys = new Array<any>();
    }

    /** 是否已经有着个key **/
    public containsKey(key: any): boolean {
        return this.props[key] != null;
    }

    public containsValue(value: Object): boolean {
        let result: boolean = false;
        const len: number = this.size();
        if (len > 0) {
            for (let i: number = 0; i < len; i++) {
                if (this.props[this._keys[i]] == value) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    public getValue(key: any): any {
        return this.props[key];
    }

    public put(key: any, value: Object): any {
        let result: Object = null;
        if (this.containsKey(key)) {
            result = this.getValue(key);
            this.props[key] = value;
        } else {
            this.props[key] = value;
            this._keys.push(key);
        }

        return result;
    }

    public remove(key: any): Object {
        const result: Object = null;
        if (this.containsKey(key)) {
            delete this.props[key];
            const index: number = this._keys.indexOf(key);
            if (index > -1) {
                this._keys.splice(index, 1);
            }
        }
        return result;
    }

    public putAll(map: HashMap): void {
        this.clear();
        const len: number = map.size();
        if (len > 0) {
            const arr: any[] = map.keys();
            for (let i: number = 0; i < len; i++) {
                this.put(arr[i], map.getValue(arr[i]));
            }
        }
    }

    /**  hash表的长度 **/
    public size(): number {
        return this._keys.length;
    }

    public isEmpty(): boolean {
        return this.size() < 1;
    }

    public values(): any[] {
        const result: any[] = new Array<any>();
        const len: number = this.size();
        if (len > 0) {
            for (let i: number = 0; i < len; i++) {
                result.push(this.props[this._keys[i]]);
            }
        }

        return result;
    }

    public keys(): any[] {
        return this._keys;
    }
}

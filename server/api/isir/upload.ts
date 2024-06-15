import isirConfig from "~/configs/isir_config";

export default defineEventHandler(async (event) => {
    const { strChunks } = await readBody(event);

    let isirData = isirConfig;

    let arIsirs:any[] = [];

    strChunks.forEach((isirStr: string, isirKey: number) => {
        let isirTemplate:any[] = [];

        isirData.forEach((field_data:any, field_key:number) => {
            field_data.value = isirStr.substring(parseInt(field_data.pos), parseInt(field_data.pos) + parseInt(field_data.len));

            isirTemplate.push({
                name: field_data.name,
                len: parseInt(field_data.len),
                pos: parseInt(field_data.pos),
                value: field_data.value,

            });
        });

        arIsirs.push(isirTemplate);
    });

    return {
        data: arIsirs
    }
})
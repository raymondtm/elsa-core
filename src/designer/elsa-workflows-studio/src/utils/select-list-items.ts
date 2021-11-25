import {
  ActivityPropertyDescriptor,
  RuntimeSelectListProviderSettings,
  SelectList,
  SelectListItem
} from "../models";
import {createElsaClient, ElsaClient} from "../services";

async function fetchRuntimeItems(serverUrl: string, options: RuntimeSelectListProviderSettings): Promise<SelectList> {
  const elsaClient = await createElsaClient(serverUrl);
  return await elsaClient.designerApi.runtimeSelectItemsApi.get(options.runtimeSelectListProviderType, options.context || {});
}

export async function getSelectListItems(serverUrl: string, propertyDescriptor: ActivityPropertyDescriptor): Promise<SelectList> {
  const options = propertyDescriptor.options;
  let selectList: SelectList;

  if (!!options && options.runtimeSelectListProviderType)
    selectList = await fetchRuntimeItems(serverUrl, options);
  else
    selectList = options as SelectList;

  return selectList;
}

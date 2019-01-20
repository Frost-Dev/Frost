import { MongoProvider } from 'frost-component';
import { ObjectId } from 'mongodb';
import { AppDocument, IAppDocument, IAppDocumentSoruce, UserDocument } from "../modules/documents";
import IApiConfig from '../modules/IApiConfig';

export interface IAppCreateOptions {
	root?: boolean;
}

export default class AppService {
	constructor(db: MongoProvider, config: IApiConfig) {
		this.db = db;
		this.config = config;
	}

	private db: MongoProvider;
	private config: IApiConfig;

	async create(name: string, user: UserDocument, description: string, scopes: string[], options?: IAppCreateOptions): Promise<AppDocument> {
		options = options || { };

		const source: IAppDocumentSoruce = {
			creatorId: user._id,
			description: description,
			name: name,
			scopes: scopes
		};

		if (options.root) {
			source.root = true;
		}

		const appDocRaw: IAppDocument = await this.db.create('api.apps', source);

		return new AppDocument(appDocRaw);
	}

	async findArrayByCreatorId(creatorId: string | ObjectId): Promise<AppDocument[]> {
		const rawAppDocs: IAppDocument[] = await this.db.findArray('api.apps', {
			creatorId: MongoProvider.buildId(creatorId)
		});

		return rawAppDocs.map(rawAppDoc => new AppDocument(rawAppDoc));
	}
}

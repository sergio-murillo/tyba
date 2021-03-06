import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { User, UserSchema } from '../models/user.schema';
import { UserDtoStub } from '../stubs/user.stub';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<any>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
  });

  beforeEach(async () => {
    userModel = mongoConnection.model(User.name, UserSchema);
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    repository = app.get<UserRepository>(UserRepository);
    await repository.save(UserDtoStub()[0]);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should find user by username when exists', async () => {
    const username = 'pepito';
    const result = await repository.findByUsername(username);
    expect(result._id).toBeDefined();
    expect(result.username).toEqual(username);
    expect(result.password).toBeDefined();
    expect(result.salt).toBeDefined();
  });

  it('should not find user by username when it does not exist', async () => {
    const username = 'pepito2';
    const result = await repository.findByUsername(username);
    expect(result).toBeNull();
  });

  it('should find all users', async () => {
    const result = await repository.findAll();
    expect(result.length).toBeGreaterThan(0);
  });
});

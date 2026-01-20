import 'package:dio/dio.dart';

class ApiService {
  
  final Dio _dio = Dio(BaseOptions(baseUrl: 'http://localhost:3000'));

  Future<Response> post(String path, dynamic data, {String? token}) async {
    return await _dio.post(
      path,
      data: data,
      options: Options(
        headers: token != null ? {'Authorization': 'Bearer $token'} : {},
      ),
    );
  }

  Future<Response> get(String path, {String? token}) async {
    return await _dio.get(
      path,
      options: Options(
        headers: token != null ? {'Authorization': 'Bearer $token'} : {},
      ),
    );
  }
}